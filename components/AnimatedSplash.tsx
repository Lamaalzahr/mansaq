// components/AnimatedSplash.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// تعريف الـ Props
type Props = {
  onAnimationFinish: () => void;
};

// نجعل دائرة الخلفية أكبر قليلاً من الشاشة
const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = Math.max(width, height) * 1.2;

export default function AnimatedSplash({ onAnimationFinish }: Props) {
  // قيم التحريك (Shared Values)
  const scale = useSharedValue(0.3);       // حجم الشعار في البداية
  const opacity = useSharedValue(0);      // شفافية الشعار
  const bgCircleScale = useSharedValue(0); // حجم دائرة الخلفية

  useEffect(() => {
    // سلسلة التحريك:
    
    // 1. ظهور وتكبير الشعار في المنتصف
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withSpring(1.2, { damping: 8, stiffness: 100 }, () => {
      
      // 2. انكماش بسيط للشعار لتجهيز أثر الانتشار
      scale.value = withTiming(1, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }, () => {
        
        // 3. توسيع الدائرة الخلفية ملء الشاشة لإتمام الانتقال
        bgCircleScale.value = withTiming(
          1, // نصل للحجم النهائي
          { duration: 800, easing: Easing.out(Easing.exp) },
          () => {
            // عند انتهاء الأنيميشن بالكامل، نخبر الشاشة الرئيسية
            runOnJS(onAnimationFinish)();
          }
        );
      });
    });
  }, []);

  // أنماط تحريك الشعار
  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // أنماط تحريك دائرة الخلفية المتوسعة
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bgCircleScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* دائرة التوسع الزرقاء */}
      <Animated.View style={[styles.expandingCircle, circleStyle]} />

      {/* الشعار واسم التطبيق فوق الدائرة */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.iconWrapper}>
          <Ionicons name="home" size={60} color="#fff" />
        </View>
        <Text style={styles.appName}>منسق</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0, // تأخذ كل مساحة الشاشة
    backgroundColor: '#121212', // خلفية داكنة مبدئية
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // تكون فوق كل شيء
  },
  expandingCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#4C6FFF', // الأزرق الخاص بك
    position: 'absolute',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4C6FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 10,
    shadowColor: '#4C6FFF',
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
});