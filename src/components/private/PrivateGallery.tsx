import styles from "./PrivateWorld.module.css";

type PrivateGalleryProps = {
  items?: readonly string[];
};

export function PrivateGallery({
  items = ["welcome", "table", "details", "party"],
}: PrivateGalleryProps) {
  return (
    <div className={styles.gallery}>
      {items.map((item, index) => (
        <figure
          className={styles.galleryItem}
          data-label={item.replaceAll("-", " ")}
          data-media-slot={"/public/media/private/gallery-" + (index + 1) + ".webp"}
          key={item + index}
        />
      ))}
    </div>
  );
}
