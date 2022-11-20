export const UploadCharacterForm = ({isOpen}: any) => {
  if (isOpen) {
    return (
      <section className="UploadCharacterForm__section">
        <h3>Upload a new Character</h3>
      </section>
    );
  } else {
    return <></>;
  }
};
