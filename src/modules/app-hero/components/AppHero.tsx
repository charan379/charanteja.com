import type React from "react";
import UserContactCard from "./UserContactCard";
import UserProfileCard from "./UserProfileCard";

const AppHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10">
      <UserProfileCard />
      <UserContactCard />
    </div>
  );
};

export default AppHero;
