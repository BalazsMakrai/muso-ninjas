import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config';

const useDocuments = (collection, id) => {
    let error = ref(null);
    let isPending = ref(null);
    let docRef = projectFirestore.collection(collection).doc(id);

    const deleteDoc = async() => {
        isPending.value = true;
        error.value = null;

        try {
            const res = docRef.delete();
            isPending.value = false;
            return res

        } catch (err) {
            console.log(err.message);
            isPending.value = false;
            error.value = 'Could not delete the document';
        }
    }

    const updateDoc = async(updates) => {
        isPending.value = true;
        error.value = null;

        try {
            const res = docRef.update(updates);
            isPending.value = false;
            return res

        } catch (err) {
            console.log(err.message);
            isPending.value = false;
            error.value = 'Could not update the document';
        }
    }

    return { error, isPending, deleteDoc, updateDoc };

};

export default useDocuments