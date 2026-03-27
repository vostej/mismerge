import{dt as e}from"./DRg8Bm-T.js";import"./_hA_bBDz.js";var t=`void swap(int *a, int *b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int array[], int low, int high) {
  int pivot = array[high];
  int i = low - 1;

  for (int j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(&array[i], &array[j]);
    }
  }
  swap(&array[high], &array[i + 1]);
  
  return i + 1;
}

/**
 * Simple implementation of the Quick Sort algorithm.
 */
void quick_sort(int array[], int low, int high) {
  if (low < high) {
    int pi = partition(array, low, high);
   
    quick_sort(array, low, pi - 1);
    quick_sort(array, pi + 1, high);
  }
}`,n=`void swap(int *a, int *b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int array[], int low, int high) {
  int pivot = array[high];
  int i = low - 1;

	// Move all the elements higher than the pivot
	// to the left side of the partition
  for (int j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(&array[i], &array[j]);
    }
  }
  swap(&array[i + 1], &array[high]);
  
  return i + 1;
}

void quick_sort(int array[], int low, int high) {
  if (low < high) {
    int pi = partition(array, low, high);
   
    quick_sort(array, low, pi - 1);
    quick_sort(array, pi + 1, high);
  }
}`,r=`void swap(int *a, int *b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int *array, int low, int high) {
  int pivot = array[high];
  int i = low - 1;

  for (int j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(&array[i], &array[j]);
    }
  }
  swap(
		&array[i + 1], 
		&array[high]
	);
  
  return i + 1;
}

void quick_sort(int array[], int low, int high) {
  if (low < high) {
    int pi = partition(array, low, high);
   
    quick_sort(array, low, pi - 1);
    quick_sort(array, pi + 1, high);
  }
}`;function i(t,n){if(typeof localStorage>`u`)return e(n);let r,i=localStorage.getItem(t);if(i)try{r=e(JSON.parse(i))}catch{r=e(n)}else r=e(n);return r.subscribe(e=>localStorage.setItem(t,JSON.stringify(e))),r}var a=i(`lhs`,t),o=i(`ctr`,n),s=i(`rhs`,r),c=i(`component`,`mismerge3`),l=i(`language`,`c`),u=i(`wrapLines`,!1),d=i(`disableMerging`,!1),f=i(`disableFooter`,!1),p=i(`ignoreWhitespace`,!1),m=i(`ignoreCase`,!1),h=i(`theme`,`light`);export{m as a,a as c,u as d,d as i,s as l,o as n,p as o,f as r,l as s,c as t,h as u};