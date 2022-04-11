import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import {
    Notify,
    Dialog
} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
    config: {
        notify: { color: 'green', textColor: 'white', position: 'top' }
    },
    plugins: {
        Notify,
        Dialog,
    }
}