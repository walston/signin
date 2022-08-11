import { FileDrop } from "react-file-drop";
import { sendUpdateAvatarRequest } from "../api/user";
import "./AvatarUploader.css";

const APIDOMAIN = process.env.REACT_APP_API_DOMAIN;

export default function AvatarUploader({ id }) {
  const onAvatarUploaderChange = (files: FileList | null) => {
    if (files && files.length) {
      sendUpdateAvatarRequest(id, files[0]);
    }
  };

  return (
    <FileDrop
      className="AvatarUploader"
      onDrop={(files) => {
        onAvatarUploaderChange(files);
      }}
    >
      <img src={`${APIDOMAIN}/users/${id}/avatar`} alt="User avatar" />
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
 * - use the defaultAvatar.jpeg image as a fallback for 404
 * - setup image saving in DB
 *  -- do not use the same request as email/user/password
 */
