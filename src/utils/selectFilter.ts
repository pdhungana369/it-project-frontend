interface ISelect {
  name: string;
  id: string;
}

export default function formatSelect(data: ISelect[]) {
  if (!data) return [];

  const result = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));
  return result;
}
