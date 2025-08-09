import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

type BottomSheetComponentProps = {
	onSelect?: (props: string) => void;
	children: React.ReactNode;
	className?: string;
};
type Ref = BottomSheetModal;

export const BottomSheetComponent = forwardRef<Ref, BottomSheetComponentProps>(
	({ onSelect, children, className }, ref) => {
		const snapPoints = useMemo(() => ['50%'], []);

		BottomSheetComponent.displayName = 'BottomSheetComponent';

		return (
			<BottomSheetModal
				snapPoints={snapPoints}
				backdropComponent={(props) => (
					<BottomSheetBackdrop
						{...props}
						appearsOnIndex={0}
						disappearsOnIndex={-1}
						style={[
							{
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								position: 'absolute',
								width: '100%',
								height: '100%',
							},
						]}
					/>
				)}
				ref={ref}
				enablePanDownToClose
				containerComponent={(props) => (
					<FullWindowOverlay>{props.children}</FullWindowOverlay>
				)}
			>
				<BottomSheetView>
					<View className='p-4 pb-12'>{children}</View>
				</BottomSheetView>
			</BottomSheetModal>
		);
	}
);
