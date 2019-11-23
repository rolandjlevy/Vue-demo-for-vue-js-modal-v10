const TableFromFetch = {
  template: '#table-template',
  data: () => ({
    tableRows: '',
    apiKey: '756ef978eb384d9cb3ecdab2d9bac0da'
  }),
  props: {
    slotpayload: {
      type: Object,
      default: {}
    }
  },
  methods: {
    async fetchNews() {
      const url = `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${this.apiKey}`;
      const response = await fetch(url);
      const result = await response.json();
      this.tableRows = result.articles.map((article, index) => {
        const obj = Object.assign({}, article, { id:index, selected:false })
        return obj;
      });
    },
    goToUrl(url) {
      window.open(url);
    },
    getSelected(key, id) {
      return this.slotpayload[key].find(item => item.id === id);
    },
    selectRow(row) {
      const found = this.tableRows.find(item => item.id === row.id);
      found.selected = !found.selected;
      const payload = this.tableRows.reduce((acc, item) => {
        if (item.selected) acc.push(item.id);
        return acc;
      }, []);
      this.$root.$emit('update-table-modal', {key: 'groupvalue', payload});
    }
  },
  mounted() {
    this.fetchNews();
  }
}

const table = `
<table class="table table-hover p-0 m-0">
    <thead>
        <tr>
            <th id="job_reference" scope="col">Name</th>
            <th id="address_1" style="text-align: left;" scope="col">Description</th>
            <th id="files" scope="col">Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 01</td>
            <td class="font-size-14px">76,Hazelmere Road Penn,High Wycombe</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 02</td>
            <td class="font-size-14px">Haig Close, St Albans</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 03</td>
            <td class="font-size-14px">Burnside Crescent / Clifford Rd, Wembley (balfour site)</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 04</td>
            <td class="font-size-14px">J/w Meadow View, Dunstable Road, Redbourn</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 05</td>
            <td class="font-size-14px">133 Telford Avenue Stevenage</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 06</td>
            <td class="font-size-14px">26,Parkfield Avenue Harrow</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 07</td>
            <td class="font-size-14px">46 High Street Harrow Weald</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 08</td>
            <td class="font-size-14px">109 Summerhouse Way Abbotts Langley</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer">
            <td class="font-size-14px font-weight-bold">Preset 09</td>
            <td class="font-size-14px">2 - 4 Hindhead Green South Oxhey.</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
        <tr class="cursor-pointer border-bottom">
            <td class="font-size-14px font-weight-bold">Preset 10</td>
            <td class="font-size-14px">Brickfield Cottages,Mount Road,Theydon Mount Epping</td>
            <td class="font-size-14px text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
    </tbody>
</table>
`;