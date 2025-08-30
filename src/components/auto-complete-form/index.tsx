import { getPlaces } from '@utils/getPlaces';
import { useState } from 'react';
import type { AutoCompleteInputProps, PlaceSuggestion } from '@types';

export function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}: AutoCompleteInputProps) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleManualInputChange(event, 'streetAndNumber');
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query: string) => {
    setIsLoading(true);
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    const streetAndNumber = suggestion.place_name.split(',')[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address: any = {
      streetAndNumber,
      place: '',
      region: '',
      country: '',
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split('.')[0];
      address[identifier] = element.text;
    });

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          id="address"
          type="text"
          placeholder="Start typing your address..."
          value={streetAndNumber}
          onChange={handleChange}
          className="w-full rounded-md border border-border px-4 py-2 text-sm focus:border-primary focus:border-opacity-50 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-border" />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-white shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="hover:bg-blue-50 cursor-pointer px-4 py-2"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
