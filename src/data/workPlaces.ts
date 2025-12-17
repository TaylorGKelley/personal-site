import { type UUID } from 'node:crypto';

export type WorkPlace = {
	id: UUID;
	jobTitle: string;
	company: string;
	location: string;
	description: string;
	startDate: Date;
	endDate?: Date;
};

const workPlaces = [
	{
		id: '37e4de29-bdb6-4482-82f2-744c65cfd84b' as UUID,
		jobTitle: 'Full-Stack Software Developer',
		company: 'Alabama Law Enforcement Agency',
		location: 'Montgomery, AL',
		description:
			'Designing and developing web applications that give users a smooth and secure experience.',
		startDate: new Date(2023, 6, 16),
	},
	{
		id: '55626c40-f50d-4bef-ade6-8792a1aaebee' as UUID,
		jobTitle: 'System Administrator',
		company: 'Alabama Medicaid Agency',
		location: 'Montgomery, AL',
		description:
			'Keeping things up and running, setting up FTP automations, and generating reports for servers.',
		startDate: new Date(2021, 7, 16),
		endDate: new Date(2023, 6, 15),
	},
] as WorkPlace[];

export default workPlaces;
