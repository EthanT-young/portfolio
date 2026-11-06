import { ExtLink } from '../components/ExtLink';
import { Reveal } from '../components/Reveal';
import { TagList } from '../components/TagList';
import { BackToProjects, DetailSection, PageHero } from './ProjectLayout';

export function RebelLocate() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects/' }, { label: 'Rebel Locate' }]}
        title="Rebel Locate"
        lede="A team project for my machine learning course: locating the UNLV building a photo was taken near from its GPS metadata, and labeling the type of room. My KNN model reached 92% accuracy on the team's 6,000+ image dataset."
        meta={
          <>
            <time className="mono-meta" dateTime="2025-01">
              Jan 2025 – May 2025
            </time>
            <span className="tech">Python · PyTorch · scikit-learn · NumPy</span>
            <span className="badge">Team of 5</span>
          </>
        }
      />

      <Reveal className="stats">
        <div className="stat">
          <span className="stat-value">92%</span>
          <span className="stat-label">accuracy for my KNN building-proximity model</span>
        </div>
        <div className="stat">
          <span className="stat-value">6,000+</span>
          <span className="stat-label">images in the team's dataset</span>
        </div>
      </Reveal>

      <DetailSection title="Overview">
        <Reveal className="prose">
          <p>Rebel Locate is a geolocator and room-labeling tool for UNLV. This page covers my implementation.</p>
        </Reveal>
      </DetailSection>

      <DetailSection title="Approach">
        <Reveal className="prose">
          <p>
            We split the main campus between us, and each of us photographed every building in our section. After
            agreeing on a shared design, we each built our own implementation and compared results across the team.
          </p>
          <p>My implementation:</p>
          <ul className="dash-list">
            <li>
              <strong>Building (KNN).</strong> A K-nearest neighbors classifier trained on the latitude and longitude
              from each photo's EXIF metadata, with K chosen by 10-fold cross-validation.
            </li>
            <li>
              <strong>Room (CNN).</strong> Takes only the predicted building's photos and fine-tunes the last layer of a
              ResNet-18 pre-trained on Places365, a scene-recognition dataset, with one output per room in that building
              (such as hallway, lounge or stairwell).
            </li>
            <li>
              <strong>No near-duplicate leakage.</strong> Photos taken within about a meter of each other, such as burst
              shots, always stay on the same side of every training/testing split, so near-duplicates can't inflate the
              reported accuracy.
            </li>
            <li>
              <strong>Output.</strong> The top three buildings and rooms for a photo, each with its probability.
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="Results">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <strong>6,000+ images</strong> in the team's dataset, covering every building on the main campus.
            </li>
            <li>
              <strong>92% accuracy</strong> for my KNN building-proximity model.
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <DetailSection title="Stack">
        <TagList label="Stack" items={['Python', 'PyTorch', 'torchvision', 'scikit-learn', 'NumPy', 'Pillow']} />
      </DetailSection>

      <DetailSection title="Links">
        <Reveal className="prose">
          <ul className="dash-list">
            <li>
              <ExtLink href="https://github.com/EthanT-young/Rebel-Locate">Source code on GitHub</ExtLink> (my
              implementation)
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <BackToProjects />
    </>
  );
}
