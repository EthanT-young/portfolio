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
        lede="A team project for my machine learning course. Rebel Locate reads a photo's GPS metadata to work out which UNLV building it was taken near, then identifies what kind of room it shows. My KNN model picked the right building 98.01% of the time, and my CNN labeled the room correctly 91.83% of the time."
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
          <span className="stat-value">98.01%</span>
          <span className="stat-label">accuracy for my KNN building model</span>
        </div>
        <div className="stat">
          <span className="stat-value">91.83%</span>
          <span className="stat-label">accuracy for my CNN room model</span>
        </div>
        <div className="stat">
          <span className="stat-value">6,000+</span>
          <span className="stat-label">images in the team's dataset</span>
        </div>
      </Reveal>

      <DetailSection title="Approach">
        <Reveal className="prose">
          <p>
            We split the main campus between the five of us, and each person photographed every building in their
            section. After agreeing on a shared design, we each built our own version and compared results.
          </p>
          <ul className="dash-list">
            <li>
              A K-nearest neighbors classifier predicts the building from the latitude and longitude in each photo's
              EXIF data. I chose K with 10-fold cross-validation.
            </li>
            <li>
              A CNN then looks only at that building's photos. It fine-tunes the last layer of a ResNet-18 pre-trained
              on Places365 (a scene-recognition dataset), with one output per room type, such as hallway, lounge or
              stairwell.
            </li>
            <li>
              Photos taken at the same spot, like burst shots, stay together on one side of every train/test split, so
              near-duplicates can't inflate the accuracy.
            </li>
            <li>For a new photo, it prints up to three likely buildings and rooms, each with its probability.</li>
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
              <ExtLink href="https://github.com/EthanT-young/Rebel-Locate">Source code on GitHub</ExtLink>
            </li>
          </ul>
        </Reveal>
      </DetailSection>

      <BackToProjects />
    </>
  );
}
