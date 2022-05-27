import React from "react";
import profileImage from "../../assets/face.jpg";

export default () => {
  return (
    <div className="lg:pt-8 pt-6 pb-6 max-w-5xl">
      <div class="lg:flex">
        <div class="flex-none pr-8 pb-8">
          <img src={profileImage} className="object-cover h-48 w-48 rounded-md border-2 border-blue-500" />
        </div>
        <div class="grow">
          <h2>Who Am I?</h2>
          <p>
            I'm a Front-End developer in the UK with a big interest in
            development be it on the web or in games to ultimately provide a
            great user experience.
          </p>
          <p>
            Eager to learn and a passion for overcoming challenges and problem
            solving. When I'm not writing code or being creative you'll find me
            practicing martial arts, adventuring outdoors or sitting peacefully
            reading a book.
          </p>
          <p>
            I'm always on the lookout to advance my knowledge to the next
            level.
          </p>
        </div>
      </div>
    </div>
  );
};
