---
sidebar_position: 500
---

# (lispkit math stats)

Library `(lispkit math stats)` implements statistical utility functions. The functions compute summary values for collections of samples, and functions for managing sequences of samples. Most of the functions accept a list of real numbers corresponding to sample values.

***

**(mode&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the mode of a set of numbers _xs_. The mode is the value that appears most often in _xs_. _xs_ is a proper list of numeric values. `=` is used as the equality operator.

**(mean&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the arithmetic mean of a set of numbers _xs_. _xs_ is a proper list of numeric values.

**(range&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the range of a set of numbers _xs_, i.e. the difference between the largest and the smallest value. _xs_ is a proper list of numeric values which are ordered using the `<` relation.

**(variance&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(variance&#x20;**_**xs bias**_**)**

Computes the variance for a set of numbers _xs_, optionally applying bias correction. _xs_ is a proper list of numeric values. Bias correction gets enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.

**(stddev&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(stddev&#x20;**_**xs bias**_**)**

Computes the standard deviation for a set of numbers _xs_, optionally applying bias correction. _xs_ is a proper list of numeric values. Bias correction gets enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.

**(skewness&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(skewness&#x20;**_**xs bias**_**)**

Computes the skewness for a set of numbers _xs_, optionally applying bias correction. _xs_ is a proper list of numeric values. Bias correction gets enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.

**(kurtosis&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(kurtosis&#x20;**_**xs bias**_**)**

Computes the kurtosis for a set of numbers _xs_, optionally applying bias correction. _xs_ is a proper list of numeric values. Bias correction gets enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.

**(absdev&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the average absolute difference between the numbers in list _xs_ and `(median xs)`.

**(quantile&#x20;**_**xs p**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the p-quantile for a set of numbers _xs_ (also known as the _inverse cumulative distribution_). _p_ is a real number between 0 and 1.0. For instance, the 0.5-quantile corresponds to the median.

**(percentile&#x20;**_**xs pct**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the percentile for a set of numbers _xs_ and a given percentage _pct_. _pct_ is a number between 0 and 100. For instance, the 90th percentile corresponds to the 0.9-quantile.

**(median&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Computes the median for a set of numbers _xs_.

**(interquartile-range&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the interquartile range for a given set of numbers _xs_. _xs_ is a proper list of numeric values. The interquartile range is the difference between the 0.75-quantile and the 0.25-quantile.

**(five-number-summary&#x20;**_**xs**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a list of 5 statistics describing the set of numbers _xs_: the minimum value, the lower quartile, the median, the upper quartile, and the maximum value.

**(covariance&#x20;**_**xs ys**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(covariance&#x20;**_**xs ys bias**_**)**

Computes the covariance of two sets of numbers _xs_ and _ys_. Both _xs_ and _ys_ are proper lists of numbers. Bias correction can be enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.

**(correlation&#x20;**_**xs ys**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(correlation&#x20;**_**xs ys bias**_**)**

Computes the correlation of two sets of numbers _xs_ and _ys_ in form of the _Pearson product-moment correlation coefficient_. Both _xs_ and _ys_ are proper lists of numbers. Bias correction can be enabled by setting _bias_ to `#t`. Alternatively, it is possible to provide a positive integer, which is used instead of the number of elements in _xs_.
