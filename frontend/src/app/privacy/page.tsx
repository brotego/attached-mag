import styles from './Privacy.module.css';

export default function PrivacyPolicy() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Introduction</h2>
          <p>
            At Attatched Magazine, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you use our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Email addresses when you subscribe to our newsletter</li>
            <li>Comments and feedback you choose to provide</li>
            <li>Information about your device and how you interact with our website</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Send you our newsletter and updates</li>
            <li>Improve our website and content</li>
            <li>Respond to your inquiries</li>
            <li>Analyze website traffic and usage patterns</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our privacy policy, please contact us at{' '}
            <a href="mailto:info@attatchedmag.com">info@attatchedmag.com</a>
          </p>
        </section>
      </div>
    </main>
  );
} 