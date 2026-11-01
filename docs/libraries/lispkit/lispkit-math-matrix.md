---
sidebar_position: 490
---

# (lispkit math matrix)

Library `(lispkit math matrix)` provides abstractions for representing vectors, matrices and for performing vector and matrix arithmetics. A matrix is a rectangular array of numbers. The library supports common matrix operations such as matrix addition, subtraction, and multiplication. There are operations to create matrices and to manipulate matrix objects. Furthermore, there is support to compute matrix determinants and to transpose and invert matrices. Matrices can be transformed into reduced row echelon form and matrix ranks can be determined.

***

**matrix-type-tag** <img class="kind" src="/img/const.png" alt="constant">

Symbol representing the `matrix` type. The `type-for` procedure of library `(lispkit type)` returns this symbol for all matrix objects.

**(make-matrix&#x20;**_**m n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new matrix with _m_ rows and _n_ columns.

**(matrix&#x20;**_**rows**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(matrix&#x20;**_**row0 row1 ...**_**)**

Returns a new matrix consisting of the given rows. Either _rows_ is a list of list or numbers, or it is a vector of vectors of numbers. Instead of specifying one _rows_ argument, it is also possible to provide the rows _row0_, _row1_, etc. as individual arguments to procedure `matrix`.

```scheme
(display (matrix->string
           (matrix '(1 2 3) '(4 5 6))))
⇒  ⎛1 2 3⎞
   ⎝4 5 6⎠
```

**(identity-matrix&#x20;**_**n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a new identity matrix with `n` rows and columns.

```scheme
(display (matrix->string
           (identity-matrix 3)))
⇒  ⎛1 0 0⎞
   ⎜0 1 0⎟
   ⎝0 0 1⎠
```

**(matrix-copy&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of _matrix_.

**(matrix-eliminate&#x20;**_**matrix i j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a copy of _matrix_ with row _i_ and column _j_ removed.

**(matrix-normalize&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a normalized version of _obj_, representing 1\*1 matrices and vectors of length 1 as a number, and m\*1 and 1\*n matrices as a vector.

**(matrix?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a matrix object, otherwise `#f` is returned.

**(matrix-vector?&#x20;**_**obj**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _obj_ is a vector of numbers.

**(matrix-zero?&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _matrix_ is a zero matrix, i.e. all its elements are zero.

**(matrix-square?&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _matrix_ is a square matrix, i.e. it has size _n\*n_.

**(matrix-identity?&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _matrix_ is an identity matrix, i.e. it has `1` at the positions _(i, i)_ and all other elements are zero.

**(matrix-symmetric?&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _matrix_ is symmetric, i.e. _matrix_ is equal to its transposed matrix.

**(matrix-dimensions?&#x20;**_**matrix m n**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if _matrix_ is a matrix of the given dimensions. _m_ is the number of rows, _n_ is the number of columns.

**(matrix=?&#x20;**_**m0 m1 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns `#t` if all matrices _m0_, _m1_, ... are equal to each other, otherwise `#f` is returned.

**(matrix-size&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the size of _matrix_ as a pair whose car is the number of rows and cdr is the number of columns.

**(matrix-rows&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of rows of _matrix_.

**(matrix-columns&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the number of columns of _matrix_.

**(matrix-row&#x20;**_**matrix i**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns row _i_ of _matrix_ as a vector.

**(matrix-column&#x20;**_**matrix j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns column _j_ of _matrix_ as a vector.

**(matrix->vector&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns _matrix_ as a vector of vectors.

**(matrix-row->list&#x20;**_**matrix i**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns row _i_ of _matrix_ as a list.

**(matrix-column->list&#x20;**_**matrix j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns column _j_ of _matrix_ as a list.

**(matrix->list&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns _matrix_ as a list of lists.

**(matrix-column-swap!&#x20;**_**matrix j k**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Swaps columns _j_ and _k_ of _matrix_.

**(matrix-row-swap!&#x20;**_**matrix i k**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Swaps rows `i` and `k` of `matrix`.

**(matrix-ref&#x20;**_**matrix i j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the _j_-th element of the _i_-th row of _matrix_.

**(matrix-set!&#x20;**_**matrix i j x**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sets the _j_-th element of the _i_-th row of _matrix_ to _x_.

**(matrix-for-each&#x20;**_**f matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Invokes _f_ for every element of _matrix_. _f_ is a procedure taking three arguments: the row, the column, and the element at this position. The traversal order is by row, from left to right.

**(matrix-fold&#x20;**_**f z matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Folds the matrix elements row by row from left to right, invoking _f_ with the accumulator, the row, the column and the element at this position.

**(matrix-transpose&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns _matrix_ in transposed form.

```scheme
(define m (matrix '(1 2 3) '(4 5 6)))
(display (matrix->string
           (matrix-transpose m)))
⇒  ⎛1 4⎞
   ⎜2 5⎟
   ⎝3 6⎠
```

**(matrix-sum!&#x20;**_**matrix m0 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Sums up _matrix_ and all matrices _m0_, ... storing the result in _matrix_.

**(matrix-difference!&#x20;**_**matrix m0 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Subtracts the matrices _m0, ..._ from _matrix_, storing the result in _matrix_.

**(matrix-add&#x20;**_**m0 m1 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the sum of matrices or vectors _m0, m1, ..._

**(matrix-subtract&#x20;**_**m0 m1 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the difference of matrix or vector _m0_ and the matrices or vectors _m1, ..._ This procedure also supports vector differences.

**(matrix-mult&#x20;**_**m0 m1 ...**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the matrix product _m0_ \* _m1_ \* _..._ or the dot product if _m0_, _m1_, ... are vectors.

**(matrix-minor&#x20;**_**matrix i j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a minor of _matrix_ by removing row _i_ and column _j_ and computing the determinant of the remaining matrix. _matrix_ needs to be a square matrix.

**(matrix-cofactor&#x20;**_**matrix i j**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns a minor of _matrix_ by removing row _i_ and column _j_ and computing the determinant of the remaining matrix. The result is negative if the sum of _i_ and _j_ is odd. _matrix_ needs to be a square matrix.

**(matrix-determinant&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the determinant of _matrix_. _matrix_ needs to be a square matrix.

**(matrix-inverse&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the inverse of _matrix_ if it exists. If it does not exist, `#f` is being returned. _matrix_ needs to be a square matrix.

```scheme
(define a (matrix '(1 2 3) '(0 1 0) '(1 1 0)))
(define b (matrix-inverse a))
(matrix-identity? (matrix-mult a b))  ⇒  #t
```

**(matrix-row-echelon!&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the reduced row echelon matrix of `matrix` by continuously applying _Gaussian Elimination_.

```scheme
(define m (matrix '(5 -6 -7   7)
                  '(6 -4 10 -34)
                  '(2  4 -3  29)))
(matrix-row-echelon! m)
(display (matrix->string m))
⇒  ⎛1 0 0  2⎞
   ⎜0 1 0  4⎟
   ⎝0 0 1 -3⎠
```

**(matrix-rank&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">

Returns the rank of _matrix_. The rank of _matrix_ is the dimension of the vector space generated by its columns. This corresponds to the maximal number of linearly independent columns of _matrix_.

**(matrix->string&#x20;**_**matrix**_**)** <img class="kind" src="/img/proc.png" alt="procedure">\
**(matrix->string&#x20;**_**matrix len**_**)**\
**(matrix->string&#x20;**_**matrix len prec**_**)**\
**(matrix->string&#x20;**_**matrix len prec noexp**_**)**

Returns a multi-line string representation of _matrix_. The elements _x_ of _matrix_ are converted into a string by invoking `(number->string x len prec noexp)`.
