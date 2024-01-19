import { CollectionConfig } from "payload/types";

const Order: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on marketplace",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user.role === "user") return true;
      return {
        user: {
          equals: user?.id,
        },
      };
    },
    create: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};

export default Order;
