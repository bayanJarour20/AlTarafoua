<template>
<div>
  <b-card no-body class="overflow-hidden">
    <b-card-header class="px-1 py-1 border-bottom">
        إعلان {{item.type == 2 ? 'فيديو' : 'صورة'}}
    </b-card-header>
    <b-card-body class="px-1 py-1">
      <b-img
        block
        height="140"
        rounded
        style="object-fit: cover;"
        class="w-100"
        :src="$store.getters['app/domainHost'] + '/' + item.imagePath"
        alt="Image 1"
      ></b-img>
        <h5 >
            <strong class="text-primary">{{item.title}}</strong>
        </h5>
        <div class="d-flex justify-content-between">
            <span>
            {{new Date(item.startDate).toLocaleDateString('en-GB')}}
            </span>
            <span>
               {{new Date(item.endDate).toLocaleDateString('en-GB')}}
            </span>
        </div>
    </b-card-body>
    <b-card-footer class="p-0"> 
      <b-button
        variant="primary"
        block
        squared
        @click="$emit('details', item)"
      >تعديل</b-button>
    </b-card-footer>
  </b-card>
</div>

</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>