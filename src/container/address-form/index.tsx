import { Button } from '@components';
import { AutoCompleteInput } from '@components/auto-complete-form';
import type { AddressFormProps, Address } from '@types';
import { DEFAULT_LOCATION } from '@utils/default-location';

const InputElement = ({
  value,
  label,
  placeholder,
  onChange,
  id,
  isRequired = true,
}: any) => {
  return (
    <div className="space-y-2">
      <div className="relative inline-block">
        <label htmlFor={id} className="block text-xs font-bold text-primary">
          {label}
        </label>

        {isRequired && (
          <p className="absolute -right-2.5 -top-1 inline-block font-black text-danger">
            *
          </p>
        )}
      </div>

      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        required={isRequired}
        onChange={onChange}
        className="w-full rounded-md border border-border px-4 py-2 text-sm focus:border-primary focus:border-opacity-50 focus:outline-none"
      />
    </div>
  );
};

export function AddressForm({
  address,
  setAddress,
  handleClick,
}: AddressFormProps) {
  const handleManualInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Address
  ) => {
    setAddress({ ...address, [field]: event.target.value });
  };

  const handleReset = () => {
    setAddress({
      streetAndNumber: '',
      place: '',
      region: '',
      country: '',
      latitude: DEFAULT_LOCATION.latitude,
      longitude: DEFAULT_LOCATION.longitude,
    });
  };

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <div className="relative inline-block">
          <label
            htmlFor="address"
            className="block text-xs font-bold text-primary"
          >
            Address
          </label>

          <p className="absolute -right-2.5 -top-1 inline-block font-black text-danger">
            *
          </p>
        </div>

        <AutoCompleteInput
          setAddress={setAddress}
          handleManualInputChange={handleManualInputChange}
          streetAndNumber={address.streetAndNumber}
        />
        <p className="mx-2 text-xs">
          Please type on address to auto complete the address
        </p>
      </div>
      <InputElement
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleManualInputChange(e, 'place')
        }
        value={address?.place}
        label="City"
        id="city"
      />
      <InputElement
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleManualInputChange(e, 'region')
        }
        value={address?.region}
        label="State/Province/Region"
        id="state"
      />
      <InputElement
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleManualInputChange(e, 'country')
        }
        value={address?.country}
        label="Country"
        id="country"
      />

      <div className="flex items-center gap-x-5">
        <Button
          onClick={handleClick}
          text="Submit"
          type="button"
          variant="primary"
          className="w-full px-4 py-2"
        />
        <Button
          text="Reset"
          type="button"
          variant="danger"
          className="w-full px-4 py-2"
          onClick={handleReset}
        />
      </div>
    </form>
  );
}
