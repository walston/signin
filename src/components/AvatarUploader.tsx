import { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import "./AvatarUploader.css";

export default function AvatarUploader({ id }) {
  const [image, setImage] = useState<null | File>(null);
  const onAvatarUploaderChange = (event) => {
    const { files } = event.target;
    setImage(files[0]);
  };

  return (
    <FileDrop
      className="AvatarUploader"
      onDrop={(files, event) => {
        if (files && files.length) {
          setImage(files[0]);
        }
      }}
    >
      {image && <img src={URL.createObjectURL(image)} alt="User avatar" />}
      <input
        id="avatar-uploader"
        type="file"
        accept="image/jpeg, image/png"
        onChange={onAvatarUploaderChange}
      />
    </FileDrop>
  );
}
/**
 * @TODO
 * - setup avatar UX so that the user can click on the avatar div to change/upload photo
 * - use the defaultAvatar.jpeg image as a fallback for 404
 * - setup image saving in DB
 *  -- do not use the same request as email/user/password
 */
