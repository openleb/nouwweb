Lists 
========

The API provides for four endpoints that will generate lists of data. These are useful for secondary queries to the ``/search`` endpoint.


``/names``
------------------
Returns the list of names of the 2009 legislators in English and in Arabic. 

``/districts``
------------------
Returns the list of districts and the number of legislators in that district. 

``/parties``
------------------
Returns the list of political parties and the number of legislators of that party. 
Some parliamentary members belong to two parties. The list will account for that by creating a duplicate listing 
that includes both parties. 

.. code-block:: none

	Legislator belongs to A and B then the list will be:
	- A
	- B
	- A,B
	- ...

``/sects``
------------------
Returns the list of sects and the number of legislators that are part of that sect. 