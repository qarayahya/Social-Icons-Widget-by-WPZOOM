import Helper from '../utils/helper';
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		selectedIcons,
		showIconsLabel,
		openLinkInNewTab,
		nofollow,
		noreferrer,
		noopener,
		relme,
		iconsFontSize,
		iconsPaddingHorizontal,
		iconsPaddingVertical,
		iconsMarginHorizontal,
		iconsMarginVertical,
		iconsBorderRadius,
		iconsLabelFontSize,
		iconsLabelColor,
		iconsLabelHoverColor,
		iconsAlignment,
	} = attributes;

	let extraClassName = attributes.className || '';
	if ( Helper.getBlockStyle( extraClassName ) == null ) {
		extraClassName = classnames( extraClassName, 'is-style-with-canvas-round' );
	}
	if ( showIconsLabel ) {
		extraClassName = classnames( extraClassName, 'show-icon-labels-style' );
	}

	const blockProps = useBlockProps.save( { className: extraClassName } );

	const relAttr = [];
	if ( nofollow ) relAttr.push( 'nofollow' );
	if ( noreferrer ) relAttr.push( 'noreferrer' );
	if ( noopener ) relAttr.push( 'noopener' );
	if ( relme ) relAttr.push( 'me' );
	if ( openLinkInNewTab ) relAttr.splice( 0, relAttr.length, 'noopener' );

	const target = openLinkInNewTab ? '_blank' : undefined;

	const iconsAlignmentStyles = {
		left: 'flex-start',
		right: 'flex-end',
		center: 'center',
	};

	const IconsList = selectedIcons.map( ( list, key ) => {
		const showIconsLabelEl = showIconsLabel ? (
			<span className={ classnames( 'icon-label' ) }>{ list.label }</span>
		) : '';

		const isCustomSvg = list.iconKit === 'svg' && list.customSvg;

		const iconContent = isCustomSvg ? (
			<span
				className={ classnames( 'social-icon', 'social-icon-svg' ) }
				dangerouslySetInnerHTML={ { __html: list.customSvg } }
			/>
		) : (
			<span
				className={ classnames(
					Helper.getIconClassList( list.iconKit, list.icon )
				) }
			/>
		);

		return (
			<a
				key={ key }
				href={ list.url }
				className="social-icon-link"
				target={ target }
				rel={ relAttr.length ? relAttr.join( ' ' ) : undefined }
				title={ list.label }
				style={ {
					'--wpz-social-icons-block-item-color': list.color,
					'--wpz-social-icons-block-item-color-hover': list.hoverColor,
				} }
			>
				{ iconContent }
				{ showIconsLabelEl }
			</a>
		);
	} );

	return (
		<div
			{ ...blockProps }
			style={ {
				...blockProps.style,
				'--wpz-social-icons-block-item-font-size': Helper.addPixelsPipe( iconsFontSize ),
				'--wpz-social-icons-block-item-padding-horizontal': Helper.addPixelsPipe( iconsPaddingHorizontal ),
				'--wpz-social-icons-block-item-padding-vertical': Helper.addPixelsPipe( iconsPaddingVertical ),
				'--wpz-social-icons-block-item-margin-horizontal': Helper.addPixelsPipe( iconsMarginHorizontal ),
				'--wpz-social-icons-block-item-margin-vertical': Helper.addPixelsPipe( iconsMarginVertical ),
				'--wpz-social-icons-block-item-border-radius': Helper.addPixelsPipe( iconsBorderRadius ),
				'--wpz-social-icons-block-label-font-size': Helper.addPixelsPipe( iconsLabelFontSize ),
				'--wpz-social-icons-block-label-color': iconsLabelColor,
				'--wpz-social-icons-block-label-color-hover': iconsLabelHoverColor,
				'--wpz-social-icons-alignment': iconsAlignmentStyles[ iconsAlignment ],
			} }
		>
			{ IconsList }
		</div>
	);
}
