import { contact } from '../data/content';
import { ExtLink } from './ExtLink';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Footer({ index }: { index?: number }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <Reveal>
          <SectionHeading index={index}>Contact</SectionHeading>
          <p className="contact-email-wrap">
            <a className="contact-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <ul className="contact-links">
            <li>
              <ExtLink href={contact.linkedin}>{contact.linkedinLabel}</ExtLink>
            </li>
            <li>
              <ExtLink href={contact.github}>{contact.githubLabel}</ExtLink>
            </li>
            <li>
              <ExtLink href={contact.resume}>Resume (PDF)</ExtLink>
            </li>
          </ul>
          <p className="footer-note">
            {contact.name} · {contact.location}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
