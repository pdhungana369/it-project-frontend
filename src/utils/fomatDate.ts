export const formatDate = (text: string | undefined) => {
  if (!text) {
    return '';
  }

  const dateObject = new Date(text);

  if (isNaN(dateObject.getTime())) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    dateObject
  );

  return formattedDate;
};
export const formatDateTime = (text: string | undefined) => {
  if (!text) {
    return '';
  }

  const dateObject = new Date(text);

  if (isNaN(dateObject.getTime())) {
    return '';
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    dateObject
  );

  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    dateObject
  );

  return `${formattedDate} ${formattedTime}`;
};
