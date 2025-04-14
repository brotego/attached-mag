'use client';

import styles from './About.module.css';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Attached Magazine</h1>
      <p className={styles.text}>
        Attached Magazine gives space to young writers. We publish work from writers who haven't been filtered through established media channels. Attached features raw and original thought. We take longform essays, cultural criticism, reviews, interviews, and short stories. We look for writing that says something not being said elsewhere.
      </p>
      <div className={styles.contactInfo}>
        <h2>Editor</h2>
        <p>Isobel Brown</p>
        <h2>Culture Editor</h2>
        <p>Toulmin Jahncke</p>
        <h2>Review Editor</h2>
        <p>Lane Schultz</p>
        <h2>Fiction Editor</h2>
        <p>Luke Van Buskirk </p>
        <h2>News Editor </h2>
        <p>Olivia Morrison </p>
        <h2>Contributing Editors</h2>
        <p>Juliette Potier <br />
        Gerardo Azpiri Iglesias <br /></p>
        <h2>Publisher</h2>
        <p>Adolescent Content 3641 Holdrege Ave Ste C, Los Angeles, CA 90016</p>
        <h2>Email</h2>
        <p>info@attachedmagazine.com</p>
      </div>
     
    </div>
  );
} 