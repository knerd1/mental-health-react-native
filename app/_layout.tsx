/**

 * This is the root layout component for the Expo Router application.
 * It sets up the application's providers, theme, and initial loading state.
 * The file serves as the entry point for the app's navigation structure.
 */
import { Slot } from "expo-router";
import "react-native-reanimated";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { OverlayProvider } from "stream-chat-expo";
import { AppointmentProvider } from "../providers/AppointmentProvider";

/**
 * InitialLayout component that handles the initial loading state
 *
 * This component checks if the authentication state has been initialized.
 * If not, it displays a loading spinner. Once initialized, it renders the
 * child routes using Expo Router's Slot component.
 *
 * @returns Loading indicator or child routes based on auth initialization state
 */
const InitialLayout = () => {
	const { authState, initialized } = useAuth();

	if (!initialized) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return <Slot />;
};

const RootLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<AppointmentProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<OverlayProvider>
					<ThemeProvider
						value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
					>
						<AuthProvider>
							<StatusBar style="auto" />
							<InitialLayout />
						</AuthProvider>
					</ThemeProvider>
				</OverlayProvider>
			</GestureHandlerRootView>
		</AppointmentProvider>
	);
};

export default RootLayout;
