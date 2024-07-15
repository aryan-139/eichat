//use ISO string to format date and time and deal accordingly

const formatDateTime = (isoString) => {
    const sentTime = new Date(isoString);
    return `${sentTime.getHours().toString().padStart(2, '0')}:${sentTime.getMinutes().toString().padStart(2, '0')}:${sentTime.getSeconds().toString().padStart(2, '0')}, ${sentTime.getDate().toString().padStart(2, '0')}-${(sentTime.getMonth() + 1).toString().padStart(2, '0')}-${sentTime.getFullYear()}`;
  };

  export { formatDateTime };