import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaLine } from "react-icons/fa6";

const Footer = () => {
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert(`${text} copied to clipboard`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  const handleOpenLink = (url: string | URL | undefined) => {
    window.open(url, "_blank");
  };

  return (
    <footer
      className="flex w-screen flex-row justify-between p-4 text-center shadow-black drop-shadow-md"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="px-2"></div>
      <div className="flex flex-row items-center justify-center gap-4 px-2">
        <IoIosMail
          size={20}
          onClick={() => handleCopyToClipboard("silaenmichael@gmail.com")}
          className="cursor-pointer"
        />
        <FaLine
          size={20}
          onClick={() => handleCopyToClipboard("michael.ballard")}
          className="cursor-pointer"
        />
        <FaInstagram
          size={20}
          onClick={() =>
            handleOpenLink("https://www.instagram.com/michael__ballard/")
          }
          className="cursor-pointer"
        />
        <FaLinkedin
          size={20}
          onClick={() =>
            handleOpenLink(
              "https://www.linkedin.com/in/michael-silaen-8ab023286/",
            )
          }
          className="cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default Footer;
