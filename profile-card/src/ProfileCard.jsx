// src/ProfileCard.jsx
function ProfileCard({ name, role, image, about }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.img} />
      <h2>{name}</h2>
      <h4>{role}</h4>
      <p>{about}</p>
    </div>
  );
}

const styles = {
  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
};

export default ProfileCard;
