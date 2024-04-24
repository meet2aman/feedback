import React from "react";

const MessagePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  return (
    <div className="text-white text-center">
      Welcome {params.username} to Messages Page
    </div>
  );
};

export default MessagePage;
