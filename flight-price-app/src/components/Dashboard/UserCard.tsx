import React from 'react';

interface UserCardProps {
  username: string;
  mutualFriends: number;
  interests: string[];
}

const UserCard: React.FC<UserCardProps> = ({ username, mutualFriends, interests }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <div className="flex items-center">
        <div className="bg-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4">
          <h3 className="text-xl text-purple-800 font-semibold">{username}</h3>
          <p>Mutual Friends: {mutualFriends}</p>
          <p>Interests: {interests.join(', ')}</p>
        </div>
      </div>
      <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg">Send Request</button>
    </div>
  );
};

export default UserCard;
