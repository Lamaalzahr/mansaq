import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
Modal,
SafeAreaView,
ScrollView,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
const router = useRouter();
const [modalVisible, setModalVisible] = useState(false);
const [roomName, setRoomName] = useState('');
const [color, setColor] = useState('');

const handleProfilePress = () => {
router.push('/profile' as any);
};

const handleOpenFullPage = () => {
setModalVisible(false);
router.push('/add-room-details' as any);
};

return (
<SafeAreaView style={styles.container}>
<View style={styles.header}>
<TouchableOpacity style={styles.avatarButton} onPress={handleProfilePress}>
<Ionicons name="person-circle-outline" size={48} color="#fff" />
</TouchableOpacity>
</View>

<View style={styles.content}>
<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
<Ionicons name="add" size={64} color="#fff" />
</TouchableOpacity>
<Text style={styles.addText}>إضافة غرفة جديدة</Text>
</View>

<Modal
animationType="fade"
transparent={true}
visible={modalVisible}
onRequestClose={() => setModalVisible(false)}
>
<View style={styles.modalOverlay}>
<View style={styles.modalContent}>
<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
<Ionicons name="close" size={24} color="#666" />
</TouchableOpacity>

<Text style={styles.modalTitle}>إضافة غرفة</Text>

<ScrollView showsVerticalScrollIndicator={false}>
<Text style={styles.label}>أسم الغرفة (مثال: صالة, غرفة نوم, مطبخ)</Text>
<TextInput
style={styles.input}
placeholder="ادخل اسم الغرفة..."
placeholderTextColor="#999"
value={roomName}
onChangeText={setRoomName}
/>

<Text style={styles.label}>الألوان المختارة</Text>
<TextInput
style={styles.input}
placeholder="أدخل الألوان (مثال: أبيض، بيج)..."
placeholderTextColor="#999"
value={color}
onChangeText={setColor}
/>

<Text style={styles.label}>الصور</Text>
<TouchableOpacity style={styles.imagePickerButton} onPress={handleOpenFullPage}>
<Ionicons name="image-outline" size={24} color="#555" />
<Text style={styles.imagePickerText}>اختر الصور</Text>
</TouchableOpacity>
</ScrollView>
</View>
</View>
</Modal>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5f7ff',
},
header: {
flexDirection: 'row',
justifyContent: 'flex-end',
paddingHorizontal: 20,
paddingTop: 20,
paddingBottom: 10,
},
avatarButton: {
width: 56,
height: 56,
borderRadius: 28,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#4C6FFF',
},
content: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingBottom: 60,
},
addButton: {
width: 140,
height: 140,
borderRadius: 70,
backgroundColor: '#4C6FFF',
alignItems: 'center',
justifyContent: 'center',
elevation: 5,
shadowColor: '#000',
shadowOpacity: 0.2,
shadowRadius: 8,
shadowOffset: { width: 0, height: 4 },
},
addText: {
marginTop: 20,
fontSize: 18,
color: '#333',
fontWeight: 'bold',
textAlign: 'center',
},
modalOverlay: {
flex: 1,
backgroundColor: 'rgba(0,0,0,0.45)',
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
modalContent: {
width: '100%',
maxWidth: 420,
backgroundColor: '#fff',
borderRadius: 16,
padding: 20,
paddingTop: 12,
},
closeButton: {
alignSelf: 'flex-end',
padding: 8,
},
modalTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#333',
marginBottom: 16,
textAlign: 'right',
},
label: {
fontSize: 14,
color: '#333',
marginBottom: 8,
textAlign: 'right',
},
input: {
borderWidth: 1,
borderColor: '#ddd',
borderRadius: 10,
paddingHorizontal: 12,
paddingVertical: 10,
fontSize: 16,
marginBottom: 16,
textAlign: 'right',
backgroundColor: '#f9f9f9',
},
imagePickerButton: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
borderWidth: 1,
borderColor: '#ddd',
borderRadius: 10,
paddingVertical: 12,
backgroundColor: '#f5f5f5',
},
imagePickerText: {
marginLeft: 8,
fontSize: 16,
color: '#555',
textAlign: 'center',
},
});