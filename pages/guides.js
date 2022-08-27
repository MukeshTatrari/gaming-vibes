import styles from "../styles/Guides.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content");
          }
          return res.json();
        })
        .then((data) => {
          setError(null);
          setGuides(data);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading ...</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4> written by {guide.author}</h4>
            <p>
              Nowadays, a book may be published traditionally or self-published
              or not even published in print at all. But most book content is
              arranged in a traditional, prescribed manner. The elements of this
              content share a common structure, and each element appears in a
              similar location in every book. The most common are outlined
              below. Some may not always appear, but when they do, they are in
              the same place in every book.
            </p>
          </div>
        ))}
    </div>
  );
}
