import { User } from "@/payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAminOrHasAccessToImages = (): Access => {
  return async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) {
      return false;
    }

    if (user.role === "admin") return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };
};

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return {
          ...data,
          user_id: req.user.id,
        };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user || !referer?.includes("sell")) {
        return true;
      }

      return await isAminOrHasAccessToImages()({ req });
    },
    delete: isAminOrHasAccessToImages(),
    update: isAminOrHasAccessToImages(),
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 760,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};

export default Media;
