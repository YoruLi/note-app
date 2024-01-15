export const formateDate = (date: number) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
  }

  return {
    getDateTime: new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(date)),
    getTime: new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(date))
  }
}
