function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN");
}

export default formatDate;
