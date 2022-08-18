import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { sendUpdateAvatarRequest } from "../api/user";
import "./AvatarUploader.css";

const APIDOMAIN = process.env.REACT_APP_API_DOMAIN;

export default function AvatarUploader({ id }) {
  const [image, setImage] = useState<null | File>(null);
  const onAvatarUploaderChange = (files: FileList | null) => {
    if (files && files.length) {
      setImage(files[0]);
      sendUpdateAvatarRequest(id, files[0]);
    }
  };
  const imageSource = image
    ? URL.createObjectURL(image)
    : `${APIDOMAIN}/users/${id}/avatar`;

  return (
    <FileDrop
      className="AvatarUploader"
      onDrop={(files) => {
        onAvatarUploaderChange(files);
      }}
    >
      <img src={imageSource} alt="User avatar" />
      <input
        id="avatar-uploader"
        type="file"
        accept="image/jpeg, image/png"
        onChange={(event) => {
          const { files } = event.target;
          onAvatarUploaderChange(files);
        }}
      />
    </FileDrop>
  );
}
/**
 * @TODO
 * - setup image saving in DB
 */
