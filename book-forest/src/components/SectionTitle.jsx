const SectionTitle = ({ text, type }) => {
  const titleClass = `${type} text-2xl font-semibold my-6`;
  return <h2 className={titleClass}>{text}</h2>;
};
export default SectionTitle;
