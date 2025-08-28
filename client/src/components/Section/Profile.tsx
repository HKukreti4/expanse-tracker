import { useAppSelector } from "../../hooks/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex gap-4">
      <span className="w-16 h-16 rounded-full text-2xl bg-red-400 flex items-center justify-center">
        {user?.name[0]}
      </span>
      <div className="flex flex-col gap-0">
        <h3 className="text-xl font-bold uppercase text-primary-400">
          {user?.name}
        </h3>
        <p className="capitalize">{user?.role}</p>
      </div>
    </div>
  );
};

export default Profile;
