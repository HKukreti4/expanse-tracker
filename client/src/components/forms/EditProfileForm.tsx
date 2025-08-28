import Button from "../buttons/Button";
import { MdClose } from "react-icons/md";
import type { formprops } from "./AddCategoryForm";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateUserThunk } from "../../redux/auth/authThunk";

const EditProfileForm = ({ setshowForm }: formprops) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth?.user?.name);
  const avatar = useAppSelector((state) => state.auth?.user?.avatar);
  // Handle image input
  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB");
        return;
      }
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
      setFile(selectedFile);
    } else {
      setImagePreview(null);
      setFile(null);
    }
  };
  useEffect(() => {
    setSelectedName(name || "");
    setImagePreview(avatar || null);
  }, []);
  // Handle form submit
  const submithandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedName.trim()) {
      toast.error("Username is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", selectedName);
    formData.append("contact", contact);
    if (file) {
      formData.append("avatar", file);
    }

    // Call API here
    dispatch(updateUserThunk(formData));
    setshowForm(false);
  };

  return (
    <div className="fixed bg-black/70 dark:bg-black/80 backdrop-blur-[4px] flex items-center justify-center z-[100] top-0 left-0 w-screen h-screen">
      <div className="form-container relative flex flex-col gap-6 items-center justify-center p-6 rounded-xl bg-white/70 dark:bg-secondary-800 w-[350px] md:w-[400px] shadow-md">
        <div
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={() => setshowForm(false)}
        >
          <MdClose />
        </div>
        <h2 className="text-2xl text-primary-500 capitalize">Update Profile</h2>
        <form className="w-full" onSubmit={submithandler}>
          {imagePreview && (
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="name"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              required
              className="focus:border-primary-500 w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none dark:bg-black"
            />
          </div>

          <div className="flex flex-col gap-2 w-full items-start mb-2 relative">
            <label htmlFor="avatar">
              Upload Avatar <span className="text-red-500">(Max 2MB)</span>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={imageHandler}
              className="focus:border-primary-500 dark:bg-black cursor-pointer w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 w-full items-start mb-2 relative">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="focus:border-primary-500 dark:bg-black resize-none w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 rounded-md text-white cursor-pointer hover:bg-primary-400 py-1 transition duration-200"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
