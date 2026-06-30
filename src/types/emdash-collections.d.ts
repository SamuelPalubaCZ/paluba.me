import type { MediaValue, PortableTextBlock } from "emdash";

declare module "emdash" {
	interface EmDashCollections {
		projects: {
			id: string;
			slug: string | null;
			status: string;
			title: string;
			featured_image?: MediaValue;
			client?: string;
			year?: string;
			summary?: string;
			content?: PortableTextBlock[];
			url?: string;
			createdAt: Date;
			updatedAt: Date;
			publishedAt: Date | null;
		};
		pages: {
			id: string;
			slug: string | null;
			status: string;
			title: string;
			content?: PortableTextBlock[];
			createdAt: Date;
			updatedAt: Date;
			publishedAt: Date | null;
		};
	}
}
