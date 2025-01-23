import type { JSX } from 'solid-js';

export function Background({ children, h, w }: { children: JSX.Element; h: number; w: number }) {
	return (
		<div class='relative' style={{ height: `${h}px`, width: `${w}px` }}>
			{children}

			<div class='z--100'>
				{/* Background */}
				<div
					class='bg top-0'
					style={{ 'background-image': 'linear-gradient(0deg,#fff,#c1f7e1 40%,#7c81ff)' }}
				/>

				{/* Decorations */}
				<div>
					<div
						class='bg top-[-250px] h-[473px] bg-repeat-x'
						style={{ 'background-image': 'url("/assets/maimai/prism/bg/aurora.png")' }}
					/>
				</div>
			</div>
		</div>
	);
}
