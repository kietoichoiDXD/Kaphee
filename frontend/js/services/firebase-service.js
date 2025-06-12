import { 
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    serverTimestamp
} from 'firebase/firestore';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase-config';

class FirebaseService {
    // Auth Methods
    async register(email, password, displayName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });
            
            // Create user document in Firestore
            await this.createUserDocument(userCredential.user.uid, {
                email,
                displayName,
                role: 'user',
                createdAt: serverTimestamp(),
                isActive: true
            });

            return userCredential.user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await this.updateUserLastLogin(userCredential.user.uid);
            return userCredential.user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // User Methods
    async createUserDocument(uid, userData) {
        try {
            await setDoc(doc(db, 'users', uid), userData);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUser(uid) {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            return userDoc.exists() ? userDoc.data() : null;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUser(uid, userData) {
        try {
            await updateDoc(doc(db, 'users', uid), userData);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUserLastLogin(uid) {
        try {
            await updateDoc(doc(db, 'users', uid), {
                lastLogin: serverTimestamp()
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Menu Methods
    async getMenuItems(category = null, limit = 20, lastDoc = null) {
        try {
            let q = collection(db, 'menuItems');
            
            if (category) {
                q = query(q, where('category', '==', category));
            }
            
            q = query(q, orderBy('createdAt', 'desc'), limit(limit));
            
            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Booking Methods
    async createBooking(bookingData) {
        try {
            const bookingRef = await addDoc(collection(db, 'bookings'), {
                ...bookingData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return bookingRef.id;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserBookings(userId) {
        try {
            const q = query(
                collection(db, 'bookings'),
                where('userId', '==', userId),
                orderBy('date', 'desc')
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Review Methods
    async createReview(reviewData) {
        try {
            const reviewRef = await addDoc(collection(db, 'reviews'), {
                ...reviewData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isVerified: false
            });
            return reviewRef.id;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // File Upload Methods
    async uploadFile(file, path) {
        try {
            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error Handler
    handleError(error) {
        console.error('Firebase Error:', error);
        return {
            code: error.code,
            message: error.message,
            details: error.details || null
        };
    }
}

export const firebaseService = new FirebaseService(); 