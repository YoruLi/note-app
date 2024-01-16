export const formateDate = (date: number) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC'
  }

  return new Intl.DateTimeFormat(window.electronAPI.locale, dateTimeOptions).format(date)
}
