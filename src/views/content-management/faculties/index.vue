<template>
    <div>       <!-- // selectedLabel --- opthinal props - default value: id -->
    
        <EKTable
            :items="facultiesListList"
            :columns="columns"
            selectedLabel="name"
            @details="openEditFaculityDialog"
            @delete-selected="fireDeleteEvent"
        >
        </EKTable>
        <createFacultie ref="editFacultieDialog" title="تعديل كلية" isEdit />
    </div>
</template>
<script>
import createFacultie from "./components/create-facultie";
import EKTable from "@Ekcore/components/EK-table";
// import { mapActions } from 'vuex';
export default {
    components: {
        EKTable,
        createFacultie
    },
    computed: {
        // ...mapGetters(['facultiesList'])
    },
    data: () => ({
        columns: [
            {
                label: "اسم الكلية",
                field: "name"
            },
            {
                label: "عدد السنوات",
                field: "numberOfYear",
                type: 'number'
            },
            {
                label: "تفاصيل",
                field: "details",
                sortable: false
            }
        ],
        facultiesListList:[
            {
               
                text:"ss",
                numberOfYear:33

            },
             {
               
                name:"ss",
                numberOfYear:33

            }
            ,
             {
               
                name:"ss",
                numberOfYear:33

            },
             {
               
                name:"ss",
                numberOfYear:33

            }
        ]
    }),
    created() {
        this.getFacultiesDetails()
    },
    methods: {
        // ...mapActions(["getFacultiesDetails"]),
        openEditFaculityDialog() {
            // this.$store.commit('Set_Facultie_Dto', p.row)
            this.$refs.editFacultieDialog.openDialog();
        },
        fireDeleteEvent(list) {
            console.log(list)
        }
    },
    beforeDestroy() {
        this.$store.commit('Reset_Search_Dto')
    }
};
</script>
