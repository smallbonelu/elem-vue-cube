const ALL = 2

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: false
    }
  },
  computed: {
    computedRatings() {
      let result = []
      this.ratings.forEach(rating => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (
          rating.rateType === this.selectType ||
          this.selectType === ALL
        ) {
          result.push(rating)
        }
      })
      return result
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    }
  }
}
