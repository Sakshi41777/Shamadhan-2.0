// src/App.jsx
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard
        name="Boss"
        role="Frontend Developer"
        image="https://i.pravatar.cc/150?img=3"
        about="Loves building modern web apps with React and animations."
      />

      <ProfileCard
        name="Alex"
        role="UI/UX Designer"
        image="https://i.pravatar.cc/150?img=5"
        about="Passionate about design and user experience."
      />
    </div>
  );
}

export default App;
