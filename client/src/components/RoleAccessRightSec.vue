<template>
    <div>
        <text-description :id="id" :filteredTodo="todoObject"></text-description>
        <statuses :selectedState="typeStateList" :filteredTodo="todoObject" :id="id"></statuses>
    </div>
</template>
<script>
    /* eslint-disable*/
    import TextDescription from "./TextDescription.vue";
    import Statuses from './Statuses.vue'
    import { mapGetters } from 'vuex'
    export default {
        props: ["todoObject", "id"],
        data: function () {
            return {
                
            }
        },
        computed: {
            ...mapGetters({
                typeStateList: 'getTask_types_state'
            })
        },
        components: {
            TextDescription,
            Statuses
        }
    }
</script>