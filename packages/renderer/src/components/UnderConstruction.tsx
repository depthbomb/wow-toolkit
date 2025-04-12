import uc from '~/assets/img/uc.png';

export const UnderConstruction = () => {
	return (
		<div className="space-y-4 size-full flex flex-col items-center justify-center">
			<img src={uc} className="size-90 rounded-4xl shadow-lg"/>
			<h1 className="text-4xl font-bold">This feature is still under construction!</h1>
		</div>
	);
};
