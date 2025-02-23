import { useLocation } from '@solidjs/router';
import clsx from 'clsx';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js';

import classNames from './Prism.module.css';

export function Background(p: { children: JSX.Element; class?: string }) {
	const location = useLocation();

	return (
		<div id='container' class={clsx('relative overflow-hidden', p.class)}>
			<div>{p.children}</div>

			<Show when={location.hash !== '#nobg'} fallback={<div class={clsx('z--100 bg-blue-2', classNames.maiDecorationBg)} />}>
				<div class='z--100'>
					<div class={classNames.maiDecorationBg}>
						<div class={clsx(classNames['background-layer'])} />
						<div class={clsx(classNames['pattern-layer'])} />
						<div class={clsx(classNames['shines-layer'])}>
							<div class={clsx(classNames.shines)}>
								<div class={clsx(classNames.shine, classNames['diamond-pink'])} />
								<div class={clsx(classNames.shine, classNames['diamond-yellow'])} />
								<div class={clsx(classNames.shine, classNames['diamond-white'])} />
								<div class={clsx(classNames.shine, classNames['star-white'])} />
								<div class={clsx(classNames.shine, classNames['star-yellow-left'])} />
								<div class={clsx(classNames.shine, classNames['star-yellow-right'])} />
							</div>
						</div>
						<div class={clsx(classNames['decoration-container'])}>
							<div class={clsx(classNames.auroras)}>
								<div class={clsx(classNames.aurora, classNames['aurora-front'])} />
								<div class={clsx(classNames.aurora, classNames['aurora-back'])} />
							</div>
							<div class={clsx(classNames.clouds)}>
								<div class={clsx(classNames.cloud, classNames['front-left'])} />
								<div class={clsx(classNames.cloud, classNames['front-right'])} />
								<div class={clsx(classNames.cloud, classNames['front-center'])} />
								<div class={clsx(classNames.cloud, classNames['back-left'])} />
								<div class={clsx(classNames.cloud, classNames['back-right'])} />
								<div class={clsx(classNames.cloud, classNames['back-center'])} />
							</div>
							<div class={clsx(classNames.moon)} />
							<div class={clsx(classNames['shooting-stars'])}>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star1'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star2'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star3'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star4'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star5'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
								<div class={clsx(classNames['shooting-star'], classNames['shooting-star6'])}>
									<div class={clsx(classNames['shooting-star-inner'])}>
										<div class={clsx(classNames['shooting-star-tail'])} />
										<div class={clsx(classNames['shooting-star-head'])} />
									</div>
								</div>
							</div>
							{/* <div class={clsx(classNames.rainbow)} />
						<div class={clsx(classNames['rainbow-bottom'])} /> */}
						</div>
					</div>
				</div>
			</Show>
		</div>
	);
}
