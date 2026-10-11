import type { ServiceCategoryId } from "@/content/services/categories";

/**
 * Licensed stills for the subjects on the service map.
 * Unsplash License: https://unsplash.com/license
 * They are not photographs of the business.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function publicFile(path: string) {
  return `${basePath}${path}`;
}

export const illustrativeNotice =
  "The photographs illustrate the subjects on the service map. They are not the business, a founder, a client, or a file. A photograph of the business appears only after the owner supplies one.";

export type WorkStill = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  credit: string;
};

const license = "Illustrative still. Unsplash License.";

export const heroStill: WorkStill = {
  src: publicFile("/visuals/pen-paper.jpg"),
  alt: "A fountain pen touching a line of handwriting on ruled paper.",
  caption: `A pen on paper. ${license} It is not a client document.`,
  width: 1600,
  height: 1201,
  credit: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
};

export const pageStills = {
  planning: {
    src: publicFile("/visuals/notes.jpg"),
    alt: "An open notebook with the word Notes written on the page, beside a fountain pen and eyeglasses.",
    caption: `A notebook. ${license} It is not a client file.`,
    width: 1600,
    height: 1067,
    credit: "https://images.unsplash.com/photo-1517842645767-c639042777db",
  },
  reading: {
    src: publicFile("/visuals/reading-room.jpg"),
    alt: "Curved wooden shelves filled with books in a public reading room.",
    caption: `A reading room. ${license} It is not the business and not a client library.`,
    width: 1600,
    height: 1068,
    credit: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  institution: {
    src: publicFile("/visuals/building.jpg"),
    alt: "A white public building with a glass wall, seen from the street.",
    caption: `A public building. ${license} It is not the business premises and not a government office.`,
    width: 1600,
    height: 1067,
    credit: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  room: {
    src: publicFile("/visuals/work-room.jpg"),
    alt: "An empty corridor in a modern work building, with a kitchen and glass meeting rooms.",
    caption: `An empty work room. ${license} It is not the business premises.`,
    width: 1600,
    height: 1068,
    credit: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
} as const satisfies Record<string, WorkStill>;

export const serviceStills: Record<ServiceCategoryId, WorkStill> = {
  "immigration-citizenship": {
    src: publicFile("/visuals/travel-wing.jpg"),
    alt: "An airplane wing above clouds in warm light.",
    caption: `Travel. ${license} It is not a client journey, and it is not proof this work is offered.`,
    width: 1600,
    height: 1063,
    credit: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
  },
  "government-forms": {
    src: publicFile("/visuals/application.jpg"),
    alt: "A blank page labeled Application on a clipboard, beside a pen and a laptop.",
    caption: `A blank application page. ${license} It is not a government form and not a client file.`,
    width: 1600,
    height: 1067,
    credit: "https://images.unsplash.com/photo-1586282391129-76a6df230234",
  },
  "career-employment": {
    src: publicFile("/visuals/resume.jpg"),
    alt: "A blank page labeled My Resume on a clipboard, beside a pen and a laptop.",
    caption: `A blank resume page. ${license} It is not a client's resume.`,
    width: 1600,
    height: 1067,
    credit: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
  },
  "tax-business-administration": {
    src: publicFile("/visuals/file-folders.jpg"),
    alt: "Red file folders standing in a row on a shelf.",
    caption: `File folders. ${license} It is not a client file.`,
    width: 1600,
    height: 1067,
    credit: "https://unsplash.com/photos/SiJt15u6Yw4",
  },
};
