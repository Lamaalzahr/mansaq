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
const [notes, setNotes] = useState('');

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


<Text style={styles.label}> الملاحظات </Text>
<TextInput style={[styles.input, styles.textArea]}
placeholder="أدخل الملاحظات..."
placeholderTextColor="#999"
multiline={true}
numberOfLines={3}
value={notes}
onChangeText={setNotes}
/>
</ScrollView>

<View style={styles.modalFooter}>
<TouchableOpacity style={styles.saveButton}
onPress={() =>{
setModalVisible(false);
}}>
<Text style={styles.saveButtonText}> حفظ سريع </Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.fullPageButton}
onPress={handleOpenFullPage}
>
<Ionicons name="open-outline" size={18} color="#007AFF" />
<Text style={styles.fullPageButtonText}>تأكيد وتعديل كامل التفاصيل</Text>
</TouchableOpacity>

</View>
</View>
</View>
</Modal>
</SafeAreaView>


);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#121212',
},
header: {
paddingHorizontal: 20,
paddingTop: 10,
alignItems: 'flex-start',
},
avatarButton: {
padding: 4,
},
content: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
addButton: {
width: 90,
height: 90,
borderRadius: 45,
borderWidth: 2,
borderColor: '#fff',
justifyContent: 'center',
alignItems: 'center',
},
addText: {
color: '#aaa',
marginTop: 12,
fontSize: 16,
},
modalOverlay: {
flex: 1,
backgroundColor: 'rgba(0, 0, 0, 0.7)',
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
modalContent: {
width: '100%',
maxHeight: '80%',
backgroundColor: '#ffffff',
borderRadius: 20,
padding: 20,
elevation: 5,
},
closeButton: {
alignSelf: 'flex-end',
padding: 4,
},
modalTitle: {
fontSize: 20,
fontWeight: 'bold',
textAlign: 'center',
marginBottom: 15,
color: '#333',
},
label: {
fontSize: 14,
fontWeight: '600',
color: '#444',
marginTop: 10,
marginBottom: 6,
textAlign: 'right',
},
input: {
backgroundColor: '#f5f5f5',
borderRadius: 10,
padding: 12,
fontSize: 14,
color: '#333',
textAlign: 'right',
},
textArea: {
height: 70,
textAlignVertical: 'top',
},
imagePickerButton: {
flexDirection: 'row-reverse',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#f0f0f0',
padding: 12,
borderRadius: 10,
borderStyle: 'dashed',
borderWidth: 1,
borderColor: '#ccc',
},
imagePickerText: {
marginRight: 8,
color: '#555',
fontSize: 14,
},
modalFooter: {
marginTop: 15,
gap: 10,
},
saveButton: {
backgroundColor: '#007AFF',
padding: 14,
borderRadius: 10,
alignItems: 'center',
},
saveButtonText: {
color: '#fff',
fontWeight: 'bold',
fontSize: 16,
},
fullPageButton: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
padding: 10,
gap: 6,
},
fullPageButtonText: {
color: '#007AFF',
fontSize: 14,
fontWeight: '600',
},
});

